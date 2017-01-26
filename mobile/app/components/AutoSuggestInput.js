'use strict';

import React, {
  Component
} from 'React';
import {   StyleSheet,
  Text,
  TextInput,
  ListView,
View } from 'react-native';
const termsArr = [
  "Birthday", 
  "Graduation",
  "Anniversary",
  "Homecoming",
  "Confirmation",
  "Bar Mitzvah",
  "Baby Shower",
  "House Warming",
  "Secret Santa",
  "Chanukah"
];
const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
export class AutoSuggestInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: []
    };
  }
  clearTerms() { this.setState({results: []}) }
  addAllTerms() { this.setState({results: termsArr}) }
  searchTerms(input) {
    String.prototype.tlc = String.prototype.toLowerCase;
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
            onBlur={() => this.clearTerms()}
            onFocus={() => this.addAllTerms()}
            onChangeText={(input) => this.searchTerms(input)}
            placeholder="Gift"
            style={styles.text_input}
             />
        <ListView
          dataSource={ds.cloneWithRows(this.state.results)}
          renderRow={this.renderResults} />
      </View>
    );
  
}
}

var styles = StyleSheet.create({
  container: {
    width: 200,
    backgroundColor: '#FFFFFF',
  },
  text_input: {
    backgroundColor: 'lightgrey',
    height: 40,
  }
});
