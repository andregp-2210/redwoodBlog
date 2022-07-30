const Article = ({ article: { id, title, body, createdAt } }) => {
  return (
    <article key={id}>
      <header>
        <h2>{title}</h2>
      </header>
      <p>{body}</p>
      <div>{createdAt}</div>
    </article>
  )
}

export default Article
