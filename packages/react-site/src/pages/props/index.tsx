import React from 'react'
export interface Props {
  name: string
}

export default function Index(props: Props) {
  const author = {
    avatarUrl:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIIgaOFwohofaftXTSUPZmpKblrpSrlnHDLbq1y3HQlA&s',
    name: 'siry',
  }
  return (
    <section>
      <Welcome name='siry' />
      <Welcome name='tisou1' />
      <Welcome name='siry2222' />
      <Comment author={author} text={'authro的text'}/>
    </section>
  )
}

class Welcome extends React.Component<Props>{
  constructor(props: Props) {
    super(props)
  }
  render() {
    return <h1>hello,{this.props.name}</h1>
  }
}

export interface CommentProps {
  author: Author
  text: string
}
interface Author {
  avatarUrl: string
  name: string
}


function Comment(props: CommentProps) {

  return (
    <div className="Comment">
      <UserInfo user={props.author}/>
      <div className="Comment-text">
        {props.text}
      </div>
      <div className="Comment-date">
        日期
      </div>
    </div>
  );
}

function Avatar(props: any) {
  return (
    <img className="Avatar"
      src={props.user.avatarUrl}
      alt={props.user.name}
    />
  )
}

function UserInfo(props: any){
  return (
    <div className="UserInfo">
      <Avatar user={props.user} />
      <div className="UserInfo-name">
        {props.user.name}
      </div>
    </div>
  )
}