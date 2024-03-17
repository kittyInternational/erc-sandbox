import styled from 'styled-components'

export const Main = styled.main`
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    flex-direction: column;
    width: 100vw;
    h1 {
        font-family: "Press Start 2P";
        font-size: 4vw;
    }
    h2 {
        font-family: "Press Start 2P";
        font-size: 2.5vw;
    }
    h3 {
        font-family: "Press Start 2P";
        font-size: 0.8vw;
    }
    p {
        font-family: Courier;
    }
`

export const Grid = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    height: 100%;
    justify-content: space-around;
    > div {
        width: 9.5%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin-bottom: 12px;
        > img {
            width: 100%;
            margin-bottom: 8px;
        }
        > p {
            width: 100%;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            font-size: 1vw;
            padding: 0 18px;
            text-align: center;
        }
    }
`