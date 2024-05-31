from flask import Flask, jsonify, request, abort
import json
import os

app = Flask(__name__)

_tasks_cache = None

def load_tasks():
    global _tasks_cache
    if _tasks_cache is not None:
        return _tasks_cache

    try:
        if not os.path.isfile('todo_store.json'):
            save_tasks([])
        with open('todo_store.json', 'r') as file:
            _tasks_cache = json.load(file)
            return _tasks_displayer
    except json.JSONDecodeError:
        save_tasks([])
        abort(500, description="Error parsing the tasks file. Data might be corrupted.")
    except IOError:
        abort(500, description="Unable to access the tasks file.")

def invalidate_tasks_cache():
    global _tasks_cache
    _tasks_cache = None

def save_tasks(tasks):
    try:
        with open('todo_store.json', 'w') as file:
            json.dump(tasks, file)
        invalidate_tasks_cache()
    except IOError:
        abort(500, description="Error saving tasks to file.")

@app.route('/api/todos', methods=['GET'])
def get_tasks():
    return jsonify(load_tasks())

@app.route('/api/todos', methods=['POST'])
def add_task():
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
    tasks = load_tasks()
    task_to_delete = next((item for item in tasks if item['id'] == task_id), None)
    if task_to_delete is None:
        abort(404, description="Task not found.")

    tasks.remove(task_to_delete)
    save_tasks(tasks)
    return jsonify({'result': True})

if __name__ == '__main__':
    app.run(debug=True)