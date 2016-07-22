/* @flow */

import React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import { shallow, mount } from 'enzyme';
import App from '../src/App';

describe("<App />", () => {
  it('should have a header', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find('h1')).to.have.length(1);
  });

  it('should have a "name" prop that defaults to "World"', () => {
    const wrapper = mount(<App />);
    expect(wrapper.props().name).to.equal('World');
  });

  it('should allow to change the name', () => {
    const name = 'this is a test';
    const wrapper = mount(<App name={name}/>);
    expect(wrapper.props().name).to.equal(name);
  });

  it('calls render', () => {
    spy(App.prototype, 'render');

    mount(<App />);
    expect(App.prototype.render).to.have.property('callCount', 1);
    App.prototype.render.restore();
  });
});
