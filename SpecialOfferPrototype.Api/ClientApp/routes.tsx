import * as React from 'react';
import { Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { SpecialOffers } from './components/SpecialOffers';

export const routes = <Layout>
    <Route exact path='/' component={ Home } />
    <Route path='/special-offers' component={SpecialOffers} />
</Layout>;
