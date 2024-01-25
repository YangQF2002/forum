interface Comment {
  user_id: Number;
  post_id: Number; // foreign key to Post table
  body: string;
}

export default Comment;
