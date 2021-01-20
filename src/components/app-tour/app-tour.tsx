import {AppSelectors, appSlice} from '@store';
import React, {useEffect} from 'react';
import {useWindowDimensions} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {TourGuideZoneByPosition, useTourGuideController} from 'rn-tourguide';

/* istanbul ignore next */
const AppTour = () => {
  const hasOnboard = useSelector(AppSelectors.hasOnboard);
  const {height, width} = useWindowDimensions();
  const {eventEmitter, canStart, start} = useTourGuideController();
  const dispatch = useDispatch();

  useEffect(() => {
    !hasOnboard && canStart && start && start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canStart]);

  useEffect(() => {
    eventEmitter?.on('stop', handleOnStop);

    return () => {
      eventEmitter?.off('stop', handleOnStop);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleOnStop = () => dispatch(appSlice.actions.onboard());

  return (
    <>
      <TourGuideZoneByPosition
        text="Start here!"
        zone={1}
        shape="circle"
        isTourGuide
        top={height - 54}
        left={width / 2 - 32}
        width={64}
        height={64}
      />
    </>
  );
};

export default AppTour;
