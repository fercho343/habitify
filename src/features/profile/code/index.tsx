import { Text, View } from '@gluestack-ui/themed'
import { t } from 'i18next'
import React from 'react'

export const Code = () => {
  return (
    <View flex={1}>
        <Text>{t('codeDescription')}</Text>
    </View>
  )
}
