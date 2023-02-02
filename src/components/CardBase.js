import { Card, Flex, Metric, Text } from '@tremor/react'
import React from 'react'

const CardBase = () => {
  return (
    <Card>
        <Text>Sales</Text>
        <Metric>100</Metric>
        <Flex>
            </Flex>        
    </Card>
  )
}

export default CardBase