import React from 'react'
import { mount } from 'enzyme'
import { expect } from 'chai'
import { spy } from 'sinon'

/*
  FrontEnd Testing Stack
  1. Mocha
  2. Chai
  3. Sinon
  4. Enzyme
  5. jsDOM
*/

import NotFoundPage from '../NotFoundPage'

describe('<NotFoundPage />', () => {
  it('contains not found text', () => {
    const wrapper = mount(<NotFoundPage />);
    expect(wrapper.find('h1').text()).to.equal('404 Page Not Found');
  });
  it('calls render', () => {
    spy(NotFoundPage.prototype, 'render');
    const wrapper = mount(<NotFoundPage />);
    expect(NotFoundPage.prototype.render.calledOnce).to.equal(true);
  });
});
