import { Routes, Route } from 'react-router-dom';
import {Home} from '../pages/home';

export function AppRouter(){
    return(
        <Routes>
            <Route path='/' element={<Home/>}/>
        </Routes>
    )
}