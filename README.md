# 🛠 Custom Tokenizer (Next.js + React + TypeScript)

This project is a **custom tokenizer tool** built with **Next.js 14 (App Router)**, **TypeScript**, **React Query**, and **React Hook Form**.  
It can **encode** text into ASCII codes and **decode** ASCII codes back into readable text — all via a simple web UI.

Visit here 👉 [customtokenizer](https://custom-tokenizer-five.vercel.app/)

[![Alt text](https://raw.githubusercontent.com/pritamjoardar/custom-tokenizer/main/home.png)](https://custom-tokenizer-five.vercel.app/)

## 📂 Project Structure

[app](./app)  
├── [api](./app/api)  
│   └── [token](./app/api/token)  
│       └── [route.ts](./app/api/token/route.ts) # Backend API (encoding/decoding logic)  
├── [page.tsx](./app/page.tsx) # Frontend UI  

[components](./components)  
├── [ui](./components/ui) # UI components (Button, Form, Textarea, etc.)


## ⚙ Features

- **Tokenization**: Splits text into tokens by spaces.
- **Encoding**: Converts each character into its **ASCII code**.
- **Decoding**: Converts ASCII codes back into text.
- **UI Toggle**: Switch between "Encode" and "Decode" views.
- **Reset/Clear**: Clear form input and results.
- **Validation**: Requires at least 2 characters before submission.
- **Type Safety**: Fully typed using **TypeScript**.
- **API-Driven**: Backend handles the encoding/decoding, frontend just displays results.
---

## 📦 Backend API

**File:** `/app/api/token/route.ts`

### Endpoint
```http
POST /api/token
```

### Request Body
```
{
  "text": "Hello World"
}
```

### Response Example
```
{
  "message": "Text received",
  "token": ["Hello", "World"],
  "encoded": [
    [72, 101, 108, 108, 111],
    [87, 111, 114, 108, 100]
  ],
  "decoded": "Hello World"
}
```

### Logic
```
function encode(arr: string[]): number[][] {
  return arr.map(str =>
    str.split("").map(char => char.charCodeAt(0))
  );
}

function decode(arr: number[][]): string {
  return arr
    .map(codes => codes.map(code => String.fromCharCode(code)).join(""))
    .join(" ");
}

```
### encode:

- **Tokenization**: Takes an array of words (string[])

- **Tokenization**: Splits each word into characters

- **Tokenization**: Maps each character to its ASCII code using charCodeAt(0)

### decode:

- **Tokenization**: Takes an array of ASCII arrays (number[][])

- **Tokenization**: Converts each ASCII code to a character using String.fromCharCode

- **Tokenization**: Joins them back into words and then into a full sentence


## 🎨 Frontend UI
**File:** `/app/page.tsx`

### Tech Stack
React Hook Form + Zod → Form validation

React Query (useMutation) → API requests and state handling

Tailwind CSS → Styling

Lucide React → Icons

Main State
mode: 'encode' or 'decode'

data: API response (token, encoded, decoded)

UI Flow
User types text in a textarea

On submit, text is sent to /api/token

Response data is stored in data

User can:

See tokenized words

Toggle between ASCII encoding and decoded text

## 🖥 Example Usage
### Input
```
Hello Hitesh
```
### Encode Mode Output
```
[
  72, 101, 108, 108, 111,
  72, 105, 116, 101, 115, 104
]
```
### Decode Mode Output
```
Hello Hitesh
```

## 🚀 How to Run Locally
```
# 1. Install dependencies
npm install

# 2. Run the development server
npm run dev

# 3. Visit in your browser
http://localhost:3000

```