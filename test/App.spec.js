/* @flow */

import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import App from '../src/components/App';

describe("<App />", () => {
  it('should have a header', () => {
    const wrapper = shallow(<App caca="aaaa"/>);
    expect(wrapper.find('h1')).to.have.length(1);
  });

  it('should show a "Hello World!" greeting by default', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find('h1').text()).to.equal('Hello World!');
  });

  it('should allow to change the greeting', () => {
    const greeting = 'this is a test';
    const wrapper = shallow(<App greeting={greeting} />);

    expect(wrapper.find('h1').text()).to.equal(greeting);
  });
});
