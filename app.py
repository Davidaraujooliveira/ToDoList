from flask import Flask, jsonify, request, abort
import json
import os

app = Flask(__name__)

def load_tasks():
    if not os.path.isfile('todo_store.json'):
        with open('todo_store.json', 'w') as file:
            json.dump([], file)
    with open('todo_store.json', 'r') as file:
        return json.load(file)

def save_tasks(tasks):
    with open('todo_store.json', 'w') as file:
        json.dump(tasks, file)

@app.route('/api/todos', methods=['GET'])
def get_tasks():
    return jsonify(load_tasks())

@app.route('/api/todos', methods=['POST'])
def add_task():
    tasks = load_tasks()
    if not request.json or not 'title' in request.json:
        abort(400)
    task = {
        'id': tasks[-1]['id'] + 1 if tasks else 1,
        'title': request.json['title']
    }
    tasks.append(task)
    save_tasks(tasks)
    return jsonify(task), 201

@app.route('/api/todos/<int:task_id>', methods=['DELETE'])
def delete_task(task_id):
    tasks = load_tasks()
    task = next((item for item in tasks if item['id'] == task_id), None)
    if task is None:
        abort(404)
    tasks.remove(task)
    save_tasks(tasks)
    return jsonify({'result': True})

if __name__ == '__main__':
    app.run(debug=True)