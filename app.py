from flask import Flask, jsonify, request, abort
import json
import os

app = Flask(__name__)

def load_tasks():
    """Load tasks from the JSON store, or return an empty list if none exist."""
    try:
        if not os.path.isfile('todo_store.json'):
            save_tasks([])  # Initialize file with an empty list if it doesn't exist
        with open('todo_store.json', 'r') as file:
            return json.load(file)
    except json.JSONDecodeError:
        save_tasks([])  # Reset the file to an empty list if JSON is corrupted
        abort(500, description="Error parsing the tasks file. Data might be corrupted.")
    except IOError:
        abort(500, description="Unable to access the tasks file.")

def save_tasks(tasks):
    """Save the tasks list to the JSON store."""
    try:
        with open('todo_store.json', 'w') as file:
            json.dump(tasks, file)
    except IOError:
        abort(500, description="Error saving tasks to file.")

@app.route('/api/todos', methods=['GET'])
def get_tasks():
    """Return all tasks."""
    return jsonify(load_tasks())

@app.route('/api/todos', methods=['POST'])
def add_task():
    """Add a new task from the request JSON body."""
    tasks = load_tasks()
    if not request.json or 'title' not in request.json:
        abort(400, description="Missing 'title' in request.")

    new_task = {
        'id': tasks[-1]['id'] + 1 if tasks else 1,
        'title': request.json['title']
    }
    tasks.append(new_task)
    save_tasks(tasks)
    return jsonify(new_task), 201

@app.route('/api/todos/<int:task_id>', methods=['DELETE'])
def delete_task(task_id):
    """Delete a task by its ID."""
    tasks = load_tasks()
    task_to_delete = next((item for item in tasks if item['id'] == task_id), None)
    if task_to_delete is None:
        abort(404, description="Task not found.")

    tasks.remove(task_to_delete)
    save_tasks(tasks)
    return jsonify({'result': True})

if __name__ == '__main__':
    app.run(debug=True)