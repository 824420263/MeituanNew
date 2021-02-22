'use strict';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Animated,
  StyleSheet,
} from 'react-native';

export default class StickyHeader extends Component {
  static propTypes = {
    stickyHeaderY: PropTypes.number,//滑动到多少悬浮-固定值
    stickyScrollY: PropTypes.any    //滚动距离
  }
  static defaultProps = {
    stickyHeaderY: -1,
    stickyScrollY: new Animated.Value(0)
  }
  constructor(props) {
    super(props);
    this.state = {
      stickyLayoutY: 0,
    };
  }
  componentDidMount() {
    // this.props.stickyScrollY.addListener((info) => {
    //   console.log(info)
    // })
  }
  _onLayout = (event) => {
    this.setState({
      stickyLayoutY: event.nativeEvent.layout.y,
    });
  }
  render() {
    const { stickyHeaderY, stickyScrollY, children, style } = this.props
    const { stickyLayoutY } = this.state
    let y = stickyHeaderY != -1 ? stickyHeaderY : stickyLayoutY;
    const translateY = stickyScrollY.interpolate({
      inputRange: [-1, 0, y, y + 1],
      outputRange: [0, 0, 0, 1],
    });

    return (
      <Animated.View
        onLayout={this._onLayout}
        style={[
          style,
          styles.container,
          { transform: [{ translateY }] }
        ]}
      >
        {children}
      </Animated.View>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    zIndex: 100
  },
});