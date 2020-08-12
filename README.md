## Установка

```
npm add rest-requestor
```

или

```
yarn add rest-requestor
```

## Инициализация

```
import RestRequestor from "../source/index";

const BASE_URL = "/api";
const Requestor = new RestRequestor(BASE_URL);
```

## Выполнение запросов

```
const response = await Requestor.execute("/news");
const response = await Requestor.execute("/news", {method: "DELETE"});
const response = await Requestor.execute("/news", {method: "PUT", body: {}});
const response = await Requestor.execute("/news", {method: "POST", body: {}});
```

## Коллбэки

```
// success
const response = await Requestor.execute("/news", {sucess: () => {console.log('Запрос успешно выполнен')}});

// failed
const response = await Requestor.execute("/news", {failed: () => {console.log('Ошибка при выполнении запроса')}});

// done
const response = await Requestor.execute("/news", {done: () => {console.log('Запрос завершен')}});
```

## Параметры запросов

```
body?: BodyInit;
isBlob?: boolean;
headers?: HeadersInit;
query?: IObjectStrings;
errors?: IObjectStrings;
isAbsolutePath?: boolean;
successStatuses?: number[];
method?: "GET" | "POST" | "PUT" | "DELETE";
done?: (response: any, status: number) => void;
failed?: (response: any, status: number) => void;
success?: (response: any, status: number) => void;
```
