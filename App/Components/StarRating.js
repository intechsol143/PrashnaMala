import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Rating } from 'react-native-ratings';

const StarRating = () => {

    const ratingCompleted = (rating) => {
    }
    return (
        <Rating
            size={5}
            ratingColor='green'
            tintColor='black'
            ratingBackgroundColor='red'
            ratingCount={5}
            imageSize={15}
            onFinishRating={ratingCompleted}
            style={{ paddingVertical: 0, backgroundColor: 'black' }}
        />
    )
}

export default StarRating

const styles = StyleSheet.create({})