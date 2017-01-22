'use strict';

import React, {
  Component
} from 'React';
import {   StyleSheet,
  Text,
  TextInput,
  ListView,
View } from 'react-native';
String.prototype.tlc = String.prototype.toLowerCase;

const termsArr = ["AAA", "B", "C", "D", "E", "F"];
const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
export class AutoSuggestInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: []
    };
  }
  searchTerms(input) {
    const results = termsArr.filter((eachTerm => eachTerm.tlc().indexOf(input.tlc()) > -1))
    this.setState({results})
  }
  renderResults(results) {
    return (
      <View>
        <Text>{ results}</Text>
      </View>
    );
  }
  render() {
    return (
      <View style={styles.container}>
        <TextInput 
            style={styles.textinput}
            onChangeText={(el) => this.searchTerms(el)}
            placeholder="Gift" />
        <ListView
          dataSource={ds.cloneWithRows(this.state.results)}
          renderRow={this.renderResults} />
      </View>
    );
  
}
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  textinput: {
    marginTop: 30,
    marginLeft: 10,
    backgroundColor: 'lightgrey',
    height: 40,
    width: 200
  }
});
