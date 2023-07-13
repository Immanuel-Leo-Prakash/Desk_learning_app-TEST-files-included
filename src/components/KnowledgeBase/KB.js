import React from 'react'
import Article from './Article'
const articles = [
  {
    id: 1,
    title: 'Zoho Desk React ESLint Prettier Setup Documentation 2021',
    date: new Date(2020, 9, 4),
    length: 11,
    snippet: 'here are two main sub sections Project Setup Guidelines and Developer Guidelines. Project Setup Guidelines is for setting the ESLint prettier config for their entire project. A single project maintainer can take responsible of it and make changes. Developer Guidelines is for each and every developer to setup ESLint and Prettier setup to their own IDE.'
  },
  {
    id: 2,
    title: 'Best Practices to avoid re-rendering in React Components',
    date: new Date(2019, 10, 22),
    length: 5,
    snippet: 'Main purpose of pure component is to avoid VDOM diff. Internally, Pure Component implements shouldComponentUpdate method. It shallow compare props and decide VDOM diff. We are using container component and container also do the same. (example: If same props return from mapstatetoprops  method then wont VDOM diff). Suppose All components are pure component, shallow compare every time. Analyse your use case and add pure component if necessary.'
  },
  {
    id: 3,
    title: 'HTML Sanitization',
    date: new Date(2018, 7, 11),
    length: 5,
    snippet: 'HTML stands for Hyper Text Markup Language HTML is the standard markup language for creating Web.'
  },
  {
    id: 4,
    title: 'what are the react team principles',
    date: new Date(2015, 5, 4),
    length: 5,
    snippet: 'A React component undergoes three phases in its lifecycle: mounting, updating, and unmounting. The mounting phase is when a new component is created and inserted into the DOM or, in other words, when the life of a component begins. This can only happen once, and is often called “initial render.'
  }
]
function KB () {
  return (
    <>
    <button type='btn' className='btn btn-primary float-right'>
    ADD
  </button>
    <main>
      <section className='articles'>
        {articles.map((item) => {
          return <Article key={item.id} {...item} />
        })}
      </section>
    </main>
    </>
  )
}

export default KB
