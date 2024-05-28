from flask import Flask, jsonify, request, abort
import json
import os

app = Flask(__name__)

def load_tasks():
    tasks = []
    try:
        if not os.path.isfile('todo_store.json'):
            with open('todo_store.json', 'w') as file:
                json.dump([], file)
        with open('todo_store.json', 'r') as file:
            tasks = json.load(file)
    except json.JSONDecodeError:
        # Handle corrupted JSON by initializing an empty list
        save_tasks([])  # Resets the file to an empty list
        abort(500, description="Error parsing the tasks file. Data might be corrupted.")
    except IOError:
        # Handle file access errors
        abort(500, description="Unable to access the tasks file.")
    return tasks

def save_tasks(tasks):
    try:
        with open('todo_store.json', 'w') as file:
            json.dump(tasks, file)
    except IOError:
        # Handle file write errors
        abort(500, description="Error saving tasks to file.")

@app.route('/api/todos', methods=['GET'])
def get_tasks():
    try:
        tasks = load_tasks()
    except Exception as e:
        # Catch any unforeseen errors
        abort(500, description=str(e))
    return jsonify(tasks)

@app.route('/api/todos', methods=['POST'])
def add_task():
    try:
        tasks = load_tasks()
        if not request.json or 'title' not in request.json:
            abort(400, description="Missing 'title' in request.")
        task = {
            'id': tasks[-1]['id'] + 1 if tasks else 1,
            'title': request.json['title']
        }
        tasks.append(task)
        save_tasks(tasks)
        return jsonify(task), 201
    except Exception as e:
        abort(500, description=str(e))

@app.route('/api/todos/<int:task_id>', methods=['DELETE'])
def delete_task(task_id):
    try:
        tasks = load_tasks()
        task = next((item for item in tasks if item['id'] == task_id), None)
        if task is None:
            abort(404, description="Task not found.")
        tasks.remove(task)
        save_tasks(tasks)
        return jsonify({'result': True})
    except Exception as e:
        abort(500, description=str(e))

if __name__ == '__main__':
    app.run(debug=True)