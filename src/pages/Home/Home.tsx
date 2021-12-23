import React, { useState } from 'react';
import {
  Box,
  HStack,
  Button,
  Input,
  UnorderedList,
  ListItem,
} from '@chakra-ui/react';
import Title from '_components/Title';

interface Todo {
  value: string;
  readonly id: number;
}

const Home = () => {
  //* stateの初期生成
  const [text, setText] = useState('');
  const [todos, setTodos] = useState<Todo[]>([]);

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
    };

    //* stateに追加
    setTodos([newTodo, ...todos]);
    //* フォームを初期化
    setText('');
  };

  const editTodo = (id: number, value: string) => {
    const deepCopy: Todo[] = JSON.parse(JSON.stringify(todos));

    const newTodos = deepCopy.map((todo) => {
      if (todo.id === id) {
        todo.value = value;
      }
      return todo;
    });

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
            value={text}
            onChange={(e) => inputOnChange(e)}
          />
          <Button colorScheme="blue" onClick={addTodo}>
            追加
          </Button>
        </HStack>
        <UnorderedList>
          {todos.map((todo) => {
            return (
              <ListItem key={todo.id}>
                <Input
                  value={todo.value}
                  onChange={(e) => editTodo(todo.id, e.target.value)}
                />
              </ListItem>
            );
          })}
        </UnorderedList>
      </Box>
    </>
  );
};

export default Home;
