import styled from "styled-components";

export const Container = styled.div`
    height: auto;
    width: 80%;
    background-color: white;
    margin : 20px 20px;
    box-shadow: rgb(3 0 71 / 9%) 0px 1px 3px;
    border-radius: 5px;
`

export const FormContainer = styled.form`

`
export const InputContainer = styled.div`
    width : 80%;
    margin: 20px 10%;
    display: flex;
    justify-content: space-between;
    align-items: center; 
    flex-wrap : wrap;
`
export const Input = styled.input`
    margin : 15px 0;
    padding : 15px;
    width : ${props => props.width};
    height: ${props => props.height};
    border : none;
    border-radius : 5px;
    background-color : #dadce0;
    transition : 0.4s;
    &: focus{
        background-color: white;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
        border : none;
        outline: none;
    }
`

export const ImageContainer = styled.label`
    width: 100%;
    height : 15vh; 
    border-radius : 5px;
    border : 1px dotted black;
    display : flex;
    justify-content : center;
    align-items: center; 
    flex-direction: column;
    margin : 15px 0;
    &: hover{
        cursor : pointer;
    }
`
export const Image = styled.input`
    display : none;

`
export const ImageButton = styled.div`
    height : 40px;
    width : 200px;
    background-color : #FCE9EC;
    border : none;
    font-weight : 200;
    font-size : 15px;
    transition: 0.3s;
    text-align-center;
    color : red;
    border-radius : 10px;
    &: hover{
        background-color : #D23F57;
        color : white;
        cursor: pointer;
    }
`

export const ImageText = styled.p`
    margin : 5px 0;
    font-weight : ${props => props.weight};
    font-size : ${props => props.size};
    color : #7D879C;
    text-align : ${props => props.text}
    
`

export const Button = styled.button`
    height : 40px;
    width : 200px;
    background-color : #FCE9EC;
    border : none;
    font-weight : 200;
    font-size : 15px;
    transition: 0.3s;
    text-align-center;
    color : red;
    border-radius : 5px;
    margin : 20px 10%;
    &: hover{
        background-color : #D23F57;
        color : white;
        cursor: pointer;
    }
`

export const TitleContainer = styled.div`
    display: flex;
    width: 270px;
    margin: 20px 10px;
    justify-content: space-between;
`

export const Icon = styled.div`
    height: 30px;
    width: 30px;
    margin: 0 10px;
`
export const Title = styled.div`
    font-size: 25px;
    font-weight: 700;
`

export const TitleParentContainer = styled.div`
    display : flex;
    justify-content: space-between;

`