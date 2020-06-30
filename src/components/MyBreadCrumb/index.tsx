import React, { useEffect } from 'react'
import { Breadcrumb } from 'antd'
import { isUuid } from 'uuidv4'

import './styles.scss'

interface IProps {
  path: string;
}

const MyBreadCrumb: React.FC<IProps> = ({ path }: IProps) => {
  useEffect(() => {
    const list = path.split('/')
    console.log(list)
  }, [path])

  const formatWord = (word: string) => {
    if (isUuid(word)) return word
    return word.charAt(0).toUpperCase() + word.slice(1)
  }

  function generateBreadCrumb () {
    const list = path.split('/')
    return (
      list.map(item => (
        <Breadcrumb.Item key={item}>{ formatWord(item) }</Breadcrumb.Item>
      ))
    )
  }

  return (
    <Breadcrumb className="breadcrumb-custom">
      <Breadcrumb.Item>MyStock</Breadcrumb.Item>
      {generateBreadCrumb()}

    </Breadcrumb>
  )
}

export default MyBreadCrumb
