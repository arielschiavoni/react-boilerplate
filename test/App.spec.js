// @flow

import React from 'react';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import App from '../src/app/components/App';
import Header from '../src/app/components/Header';
import NavBar from '../src/app/components/NavBar';

describe("<App />", () => {
  it('should have a Header', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(Header)).to.have.length(1);
  });

  it('should have a NavBar', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(NavBar)).to.have.length(1);
  });

  it('should show a "Simple counter React App!" title by default', () => {
    const wrapper = mount(<App />);
    expect(wrapper.find('h1').text()).to.equal('Simple counter React App!');
  });

  it('should allow to change the title', () => {
    const title = 'this is a test';
    const wrapper = mount(<App title={title} />);

    expect(wrapper.find('h1').text()).to.equal(title);
  });
});
