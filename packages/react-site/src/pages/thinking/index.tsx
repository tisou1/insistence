import React, { Component } from 'react'

export default class Thinking extends Component {
  render() {
    return (
      <div>
        <FilterableProductTable />
      </div>
    )
  }
}


class ProductCategoryRow extends React.Component<{category: string}> {
  render() {
    const category = this.props.category
    return (
      <tr>
        <th colSpan={2}>
          {category}
        </th>
      </tr>
    )
  }
}

class ProductRow extends React.Component<{product: Product}> {

  render() {
    const product = this.props.product
    const name = product.stocked ?
      product.name :
      <span style={{color: 'red'}}>{product.name}</span>
    return (
      <tr>
        <td>{name}</td>
        <td>{product.price}</td>
      </tr>
    )
  }
}

class ProductTable extends React.Component<{filterText: string,inStockOnly:boolean, products: Product[]}> {

  render() {
    const filterText = this.props.filterText
    const inStockOnly = this.props.inStockOnly

    const rows: React.ReactNode[] =[]
    let lastCategory: string | null = null


    this.props.products.forEach((product) => {
      if(product.name.indexOf(filterText) === -1) {
        return
      
      }
      if(inStockOnly && !product.stocked) {
        return
      }
      //放入title
      if(product.category !== lastCategory) {
        rows.push(
          <ProductCategoryRow
            category={product.category}
            key={product.category} />
        )
      }
      //放入具体想
      rows.push(
        <ProductRow
          product={product}
          key={product.name} />
      )

      lastCategory = product.category
    })
    return(
      <table>
        <thead>
         <tr>
          <th>Name</th>
          <th>Price</th>
         </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>
    )
  }
}

class SearchBar extends React.Component<
{ 
  filterText: string,
  inStockOnly: boolean
  onFilterTextChange: (filterText: string) => void,
  onInStockChange: (inStockOnly: boolean) => void
}
> {

  handleFilterTextChange = (e: React.FormEvent<HTMLInputElement>) => {
    this.props.onFilterTextChange(e.currentTarget.value)
  }

  handleInstockChange = (e: React.FormEvent<HTMLInputElement>) => {
    this.props.onInStockChange(e.currentTarget.checked)
  }
  render() {
    const filterText = this.props.filterText
    const isStockOnly = this.props.inStockOnly

    return (
      <form>
      <input 
        type="text" 
        placeholder="Search..." 
        value={filterText}
        onChange={this.handleFilterTextChange}
      />
      <p>
        <input 
          type="checkbox"
          checked={isStockOnly}
          onChange={this.handleInstockChange}
         />
        {' '}
        Only show products in stock
      </p>
    </form>
    )
  }
}


class FilterableProductTable extends React.Component {
  state = {
    filterText: '',
    inStockOnly: false
  }

  handleFilterTextChange = (filterText: string) =>  {
    this.setState({
      filterText: filterText
    });
  }
  
  handleInStockChange = (inStockOnly: boolean) => {
    this.setState({
      inStockOnly: inStockOnly
    })
  }


  render() {
    const { filterText, inStockOnly } = this.state
    return(
      <div>
        <SearchBar 
          filterText={filterText}
          inStockOnly={inStockOnly}
          onFilterTextChange={this.handleFilterTextChange}
          onInStockChange={this.handleInStockChange}
        />
        <ProductTable 
          products={PRODUCTS}
          filterText={filterText}
          inStockOnly={inStockOnly}
        />
      </div>
    )
  }
}

interface Product {
  category: string
  price: string
  stocked: boolean
  name: string
}
const PRODUCTS: Product[] = [
  {category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football'},
  {category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball'},
  {category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball'},
  {category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch'},
  {category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5'},
  {category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7'}
];