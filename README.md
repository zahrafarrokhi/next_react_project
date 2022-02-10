# Installation and setup

## Installing nextjs
```sh
npx create-next-app 
```

## bootstrap
Apparently node-sass doesn't work on my laptop, so i used sass instead:
```
npm install bootstrap react-bootstrap sass
```

Then change `global.css` to `global.scss` and add the following line:
```scss
@import '/node_modules/bootstrap/scss/bootstrap.scss';
```
Dont forget to fix the import in `_app.js`!

## Installing Axios
```sh
npm install axios
```

## Installing proptypes
```sh
npm i prop-types
```


# Setting up nextjs layout
## Setting up perpage layout
[Nextjs documentation](https://nextjs.org/docs/basic-features/layouts)

Update `pages/_app.js` file to include this:
```jsx
  const getLayout = Component.getLayout || ((page) => page)
  return getLayout(<Component {...pageProps} />)
```
Now you can add your prefered layout to each page by adding a `.getLayout` property to the component:
```jsx
const Component = () => {....}

Component.getLayout = (page) => {
  return <Layout>{page}</Layout>
}

```
# point 
```
git push --tags
```
