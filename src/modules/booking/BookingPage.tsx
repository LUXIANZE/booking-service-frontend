import React, {useEffect, useState} from "react";
import {useSearchParams} from "react-router-dom";

export const BookingPage: React.FC = () => {
    const [searchParams] = useSearchParams();
    const [selectedSessionId, setSelectedSessionId] = useState<number>();

    useEffect(() => {
        const selectedSessionIdQueryParam = Number(searchParams.get('selectedSessionId'));
        console.log(selectedSessionIdQueryParam);
        setSelectedSessionId(selectedSessionIdQueryParam);
    }, [searchParams]);

    return <>
        <div onClick={() => {
            console.log(selectedSessionId);
        }
        }>click
        </div>
    </>;
};