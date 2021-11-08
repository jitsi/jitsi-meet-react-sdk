import * as React from 'react'
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { JitsiMeeting } from '../index';
import { DEFAULT_DOMAIN, DEFAULT_OPTIONS } from '../constants';
import { IJitsiMeetExternalApi } from '../types';

describe('JitsiMeeting component', () => {
  it('should render correctly', () => {
    const props = {
      ...DEFAULT_OPTIONS,
      domain: DEFAULT_DOMAIN,
      onApiReady: (externalApi: IJitsiMeetExternalApi) => { console.log(externalApi); }
    };

    const wrapper = shallow(<JitsiMeeting {...props} />);
    const snapshot = toJson(wrapper);
    // Overwrite non-deterministic fields
    snapshot.children[0].props.id = 'test';
    snapshot.children[0].props.key = 'test';
    expect(snapshot).toMatchSnapshot();
  });

  it('should render iframe', () => {
    const props = {
      ...DEFAULT_OPTIONS,
      domain: DEFAULT_DOMAIN,
      onApiReady: (externalApi: IJitsiMeetExternalApi) => { console.log(externalApi); }
    };
    const wrapper = shallow(<JitsiMeeting {...props} />);
    const iframe = wrapper.find('iframe');
    expect(iframe).toBeTruthy();
  });
});