import * as React from 'react'
import { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { JaaSMeeting } from '../index';
import { DEFAULT_OPTIONS } from '../constants';
import { IJitsiMeetExternalApi } from '../types';
import { JitsiMeeting } from '../components';

describe('JaaSMeeting component', () => {

  it('should render correctly', () => {
    const props = {
      ...DEFAULT_OPTIONS,
      appId: 'testAppId',
      onApiReady: (externalApi: IJitsiMeetExternalApi) => { console.log(externalApi); }
    };
    const wrapper = mount(<JaaSMeeting {...props} />);
    const snapshot = toJson(wrapper);
    // Overwrite non-deterministic fields
    snapshot.children[0].children[0].props.id = 'test';
    snapshot.children[0].children[0].props.key = 'test';
    expect(snapshot).toMatchSnapshot();
  });

  it('should pass the correct props to the JitsiMeeting component', () => {
    const props = {
      roomName: 'testRoom',
      appId: 'testAppId',
      onApiReady: (externalApi: IJitsiMeetExternalApi) => { console.log(externalApi); }
    };
    const wrapper = shallow(<JaaSMeeting {...props} />);
    expect(wrapper.find(JitsiMeeting).prop('roomName')).toBe('testAppId/testRoom');
    expect(wrapper.find(JitsiMeeting).prop('domain')).toBe('8x8.vc');
  });
});