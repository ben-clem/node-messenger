import {useState} from 'react';
import Axios from 'axios';
/** @jsx jsx */
import {jsx} from '@emotion/core';

const styles = {

};

export default async () => {
    const [channels, setChannels] = useState([]);
    const {data} = await Axios.get('http://localhost:3001/channels/');
    setChannels(())

    return (
        <div css={styles.root}>
            <p>Available channels:</p>
            <ul>
                {channels.map((channel) => (
                    <li key={channel.id} css={styles.channel}>
                        {channel.name}
                    </li>
                ))}
            </ul>
        </div>
    )
}