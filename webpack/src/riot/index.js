import {mount, component} from 'riot'
import App from './app.riot'

const mountApp = component(App)

const app = mountApp(
    document.getElementById('root'),
    { message: 'Hello World' }
)