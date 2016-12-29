import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import * as actions from './../actions/'
import { GiftCard } from './../components/GiftCard'
import { 
  Container,
  Content
} from 'native-base'
import * as Utils from './../utils/utils'
// should get an array of all the gifts
export class BodyEventsView extends React.Component {
  static propTypes = {
      isSelected: React.PropTypes.bool,
  }
  render() {
    // I can use truthy or falsy, but I prefer to keep the logic explicit in case I want to add another tab

    return (
      <Container>
        <Content>
     
          </Content>
      </Container>
    );
  }
}

const mdtp = (dispatch) => ({ actions: bindActionCreators(actions, dispatch) })
const mstp = (state) => ({state});
export default connect(mstp, mdtp)(BodyEventsView)