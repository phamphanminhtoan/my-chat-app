import { StackNavigator } from 'react-navigation';
import AppContainer from './../containers/AppContainer';

const Root = StackNavigator({
    Authorized: { screen: AppContainer },
}, {
        headerMode: 'screen',
        navigationOptions: {
            header: {
                visible: false
            }
        }
    });

export default Root;

/**
 * navigate (push)
 *   #              #
 *   # Unauthorized #
 *   # Authorized   #
 *   ################
 */

/**
 *  1) RESET
 *   #              #
 *   #              #
 *   #              #
 *   ################
 *
 *  2) NAVIGATE
 *
 *   #              #
 *   #  Authorized  #
 *   #              #
 *   ################
 */
