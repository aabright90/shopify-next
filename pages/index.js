import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import ProductCard from '../components/ProductCard'
import { client } from '../lib/shopifyClient'

export default function Home({ products }) {

  const renderProductCards = () => {
    if(products){
      return products.map(product => {
        return <ProductCard key={product.id} product={product} />
      })
    }
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="bg-white">
        <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
          <h2 className="text-2xl font-extrabold text-gray-900 mb-6">
            Products
          </h2>
          <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {renderProductCards()}
        </div>
      </div>
    </div>
      
    </div>
  )
}

export const getServerSideProps = async (context) => {
    const products = await client.product.fetchAll(); 
    
    return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
      },
    };
};