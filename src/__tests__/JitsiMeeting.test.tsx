import * as React from 'react'
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { JitsiMeeting } from '../index';
import { DEFAULT_DOMAIN, DEFAULT_OPTIONS } from '../constants';

describe('JitsiMeeting component', () => {

  it('should render correctly', () => {
    const props = {
      id: "testingRender",
      domain: DEFAULT_DOMAIN,
      options: DEFAULT_OPTIONS,
      onApiReady: () => { return {}; }
    };
    const wrapper = shallow(<JitsiMeeting {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render iframe', () => {
    const props = {
      id: "testingForIframe",
      domain: DEFAULT_DOMAIN,
      options: DEFAULT_OPTIONS,
      onApiReady: () => { return {}; }
    };
    const wrapper = shallow(<JitsiMeeting {...props} />);
    const iframe = wrapper.find("iframe");
    expect(iframe).toBeTruthy();
  });
});