import styled from "styled-components";

export const Div = styled.div`
    margin-bottom: 24px;
    overflow: auto;
    > div {
        margin-bottom: 24px;
        display: flex;
        > div {
            flex-grow: 1;
            > div {
                background-color: #EEE;
                padding: 6px 12px;
                &:first-of-type {
                    background-color: #CDCDCD;
                    overflow: hidden;
                    > span {
                        display: inline-block;
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        width: 220px;
                        @media (min-width: 600px) {
                            width: auto;
                        }
                    }
                }
                &:last-of-type {
                    background-color: #FFF;
                    font-size: 12px;
                }
            }
        }
    }
`