import React, {FC} from 'react';
import {Figure} from "../models/figures/Figure";

interface LostFiguresProps {
    figures: Figure[]
}

const LostFigures:FC<LostFiguresProps> = ({figures}) => {
    return (
        <div className='lostFigures'>
                {figures.map(figure =>
                    <div key={figure.id}>
                        {figure.logo && <img width={30} height={30} src={figure.logo}/>}
                    </div>
                )}
        </div>
    );
};

export default LostFigures;