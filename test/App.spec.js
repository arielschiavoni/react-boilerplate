// @flow

import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import App from '../src/components/App';

describe("<App />", () => {
  it('should have a header', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find('h1')).to.have.length(1);
  });

  it('should show a "Simple counter React App!" title by default', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find('h1').text()).to.equal('Simple counter React App!');
  });

  it('should allow to change the title', () => {
    const title = 'this is a test';
    const wrapper = shallow(<App title={title} />);

    expect(wrapper.find('h1').text()).to.equal(title);
  });
});
