import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import * as React from 'react';

import { DEFAULT_DOMAIN } from '../constants';
import { JitsiMeeting } from '../index';
import { IJitsiMeetExternalApi } from '../types';

/* eslint-disable no-undef */

describe('JitsiMeeting component', () => {
    it('should render correctly', () => {
        const props = {
            domain: DEFAULT_DOMAIN,
            roomName: 'TestingJitsiMeetingComponent',
            onApiReady: (externalApi: IJitsiMeetExternalApi) => {
                console.log(externalApi);
            }
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
            domain: DEFAULT_DOMAIN,
            roomName: 'TestingJitsiMeetIFrame',
            onApiReady: (externalApi: IJitsiMeetExternalApi) => {
                console.log(externalApi);
            }
        };
        const wrapper = shallow(<JitsiMeeting {...props} />);
        const iframe = wrapper.find('iframe');

        expect(iframe).toBeTruthy();
    });
});
