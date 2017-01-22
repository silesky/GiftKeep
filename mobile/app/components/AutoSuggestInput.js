'use strict';

import React, {
  Component
} from 'React';
import {   StyleSheet,
  Text,
  TextInput,
  ListView,
View } from 'react-native';
const termsArr = ["Graduation", "Birthday"];
const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
export class AutoSuggestInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: []
    };
  }
  searchTerms(input) {
    String.prototype.tlc = String.prototype.toLowerCase;
    const results = termsArr.filter((eachTerm => eachTerm.tlc().indexOf(input.tlc()) > -1))
    this.setState({results})
  }
  renderResults(results) {
    return (
      <View>
        <Text>{results}</Text>
      </View>
    );
  }
  render() {
    return (
      <View style={styles.container}>
        <TextInput 
            style={styles.textinput}
            onChangeText={(el) => this.searchTerms(el)}
            placeholder="Type your adress here" />
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
    backgroundColor: '#DDDDDD',
    height: 40,
    width: 200
  }
});
