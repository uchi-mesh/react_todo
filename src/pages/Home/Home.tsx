import React, { useState } from 'react';
import {
  Box,
  HStack,
  Stack,
  Button,
  Input,
  Checkbox,
  Select,
} from '@chakra-ui/react';
import Title from '_components/Title';

interface Todo {
  value: string;
  readonly id: number;
  checked: boolean;
  removed: boolean;
}

type Filter = 'all' | 'checked' | 'unchecked' | 'removed';

const Home = () => {
  //* stateの初期生成
  const [text, setText] = useState('');
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<Filter>('all');

  //* フォーム入力時イベント
  const inputOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  //* todo追加処理
  const addTodo = () => {
    if (!text) return;

    //* 新しいtodoを作成
    const newTodo: Todo = {
      value: text,
      id: new Date().getTime(),
      checked: false,
      removed: false,
    };

    //* stateに追加
    setTodos([newTodo, ...todos]);
    //* フォームを初期化
    setText('');
  };

  //* 追加されたタスクの編集イベント
  const editTodo = (id: number, value: string) => {
    const deepCopy: Todo[] = JSON.parse(JSON.stringify(todos));

    const newTodos = deepCopy.map((todo) => {
      if (todo.id === id) {
        todo.value = value;
      }
      return todo;
    });

    //* todos ステート配列をチェック（あとでコメントアウト）
    // console.log('=== Original todos ===');
    // todos.map((todo) => console.log(`id: ${todo.id}, value: ${todo.value}`));

    setTodos(newTodos);
  };

  //* タスク完了チェック
  const checkTodo = (id: number, checked: boolean) => {
    const deepCopy: Todo[] = JSON.parse(JSON.stringify(todos));

    const newTodos = deepCopy.map((todo) => {
      if (todo.id === id) {
        todo.checked = !checked;
      }
      return todo;
    });

    setTodos(newTodos);
  };

  //* タスク削除
  const removeTodo = (id: number, removed: boolean) => {
    const deepCopy: Todo[] = JSON.parse(JSON.stringify(todos));

    const newTodos = deepCopy.map((todo) => {
      if (todo.id === id) {
        todo.removed = !removed;
      }
      return todo;
    });
    setTodos(newTodos);
  };

  //* タスクフィルタリング
  const filteredTodos: Todo[] = todos.filter((todo) => {
    switch (filter) {
      case 'all':
        return !todo.removed;
      case 'checked':
        return todo.checked && !todo.removed;
      case 'unchecked':
        return !todo.checked && !todo.removed;
      case 'removed':
        return todo.removed;
      default:
        return todo;
    }
  });

  //* ゴミ箱を空にする
  const emptyGarbage = () => {
    const newTodos = todos.filter((todo) => !todo.removed);
    setTodos(newTodos);
  };

  return (
    <>
      <Box>
        <Title as="h2" size="sm">
          ToDoリスト
        </Title>
        <HStack my={4}>
          <Input
            placeholder="新規タスク"
            disabled={filter === 'removed'}
            value={text}
            onChange={(e) => inputOnChange(e)}
          />
          <Button
            colorScheme="blue"
            disabled={filter === 'removed'}
            onClick={addTodo}>
            追加
          </Button>
        </HStack>
        <Stack>
          <HStack justify="space-between">
            <Box>
              <Select
                defaultValue="all"
                onChange={(e) => setFilter(e.target.value as Filter)}>
                <option value="all">すべてのタスク</option>
                <option value="checked">完了したタスク</option>
                <option value="unchecked">現在のタスク</option>
                <option value="removed">ごみ箱</option>
              </Select>
            </Box>
            <Box display={filter === 'removed' ? 'block' : 'none'}>
              <Button
                colorScheme="gray"
                onClick={emptyGarbage}
                disabled={todos.filter((todo) => todo.removed).length === 0}>
                ゴミ箱を空にする
              </Button>
            </Box>
          </HStack>
          <Box>
            {filteredTodos.map((todo) => {
              return (
                <Box key={todo.id} my={2}>
                  <HStack>
                    <Checkbox
                      isChecked={todo.checked}
                      disabled={todo.removed}
                      onChange={() =>
                        checkTodo(todo.id, todo.checked)
                      }></Checkbox>
                    <Input
                      value={todo.value}
                      disabled={todo.checked || todo.removed}
                      onChange={(e) => editTodo(todo.id, e.target.value)}
                    />
                    <Button
                      colorScheme={todo.removed ? 'green' : 'red'}
                      onClick={() => removeTodo(todo.id, todo.removed)}>
                      {todo.removed ? '復元' : '削除'}
                    </Button>
                  </HStack>
                </Box>
              );
            })}
          </Box>
        </Stack>
      </Box>
    </>
  );
};

export default Home;
