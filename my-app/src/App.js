import './App.css';
import React, { useState, useEffect } from 'react'
import 'semantic-ui-css/semantic.min.css'
import { Container, Divider, Checkbox, Grid, Header, Icon, Feed, Button, Card} from 'semantic-ui-react'
import * as R from 'ramda'

const App = () => {
  const[filter, setFilter] = useState('ALL')
  const getAllPublications = async () => {
    const url = `http://localhost:5000/graphql?query=query{publications{abstract title author doi}}`;
    const res = await fetch(url)
    const publicationsInfo = await res.json()
    setPublications(publicationsInfo.data.publications)
  };
  const [publications, setPublications] = useState('');
  useEffect(() => {
    if (!publications) {
        getAllPublications();
    }
  }, []);
  return(
  <Container>
    <style>
      {`
      html, body {
        background-color: #EDF5E1  !important;
      }
      p {
        align-content: center;
        background-color: #EDF5E1;
        color: #fff;
        display: flex;
        flex-direction: column;
        justify-content: center;
        min-height: 6em;
      }
      p > span {
        opacity: 0.4;
        text-align: center;
      }
    }
    `}
    </style>
      {/*85dcb */}
    <Header as='h2'  icon textAlign='center'>
    <Icon color='teal' name='dna' />
        Publications for the Public
        <Header.Subheader>
        Disseminating COVID-19 Publications for the Public
        </Header.Subheader>
      </Header>
    <Divider />    
    <Header as='h4' textAlign='left'>
        Filter based on specific areas of COVID-19 research interest:
    </Header>
    <Grid columns={5}>
    <Grid.Column>
    <Checkbox slider checked={filter === 'ALL'} onClick= {()=> setFilter('ALL')}
        label={'All'}
      />
      </Grid.Column>
      <Grid.Column>
      <Checkbox slider checked={filter === 'VACCINE'} onClick= {()=> setFilter('VACCINE')}
        label={'Vaccine'}
      />
      </Grid.Column>
      <Grid.Column>
      <Checkbox slider checked={filter === 'VARIANTS'} onClick= {()=> setFilter('VARIANTS')}
        label={'Variants'}
      />
      </Grid.Column>
      <Grid.Column>
      <Checkbox slider checked={filter === 'PUBLICHEALTH'} onClick= {()=> setFilter('PUBLICHEALTH')}
        label={'Public Health Measures'}
      />
      </Grid.Column>
      <Grid.Column>
      <Checkbox slider checked={filter === 'OTHER'} onClick= {()=> setFilter('OTHER')}
        label={'Other'}
      />
      </Grid.Column>
    </Grid>
      <Divider />  
      <Card.Group centered itemsPerRow={4}>
      {
        R.map(
          ({abstract, title, author, doi}) => (
              <PublicationCard 
                  name = {title}
                  summary = {abstract}
                  authors = {author}
                  doi = {doi}
              />
        ), publications
        )}
        </Card.Group>
      <Card.Group centered itemsPerRow={4}>
      {/* <PublicationCard name='Publication Name' summary='This is a summary of the publication' authors='Authors' doi='1234'/> */}
      {/* <PublicationCard name='Publication Name' summary='This is a summary of the publication' authors='Authors' doi='1234'/>
      <PublicationCard name='Publication Name' summary='This is a summary of the publication' authors='Authors' doi='1234'/>
      <PublicationCard name='Publication Name' summary='This is a summary of the publication' authors='Authors' doi='1234'/> */}
      </Card.Group>

      {/* <Card.Group centered itemsPerRow={4}>
      <PublicationCard name='Publication Name' summary='This is a summary of the publication' authors='Authors' doi='1234'/>
      <PublicationCard name='Publication Name' summary='This is a summary of the publication' authors='Authors' doi='1234'/>
      <PublicationCard name='Publication Name' summary='This is a summary of the publication' authors='Authors' doi='1234'/>
      <PublicationCard name='Publication Name' summary='This is a summary of the publication' authors='Authors' doi='1234'/>
      </Card.Group>

      <Card.Group centered itemsPerRow={4}>
      <PublicationCard name='Publication Name' summary='This is a summary of the publication' authors='Authors' doi='1234'/>
      <PublicationCard name='Publication Name' summary='This is a summary of the publication' authors='Authors' doi='1234'/>
      <PublicationCard name='Publication Name' summary='This is a summary of the publication' authors='Authors' doi='1234'/>
      <PublicationCard name='Publication Name' summary='This is a summary of the publication' authors='Authors' doi='1234'/>
      </Card.Group> */}

      <Divider /> 
    <Container>
      <Header as='h2' inverted icon textAlign='left'>
      :)
        <br/>
          <Header.Subheader>
          :)
          </Header.Subheader>
          </Header>
          <Grid columns={1} divided>
          <Grid.Row>
          </Grid.Row>
          </Grid>
      <Divider/>
    </Container>
  </Container>
  )
}

const PublicationCard = ({name, authors, summary, doi, concept1, concept2, concept3}) =>{
  return (
    <Card color="teal">
      <Card.Content>
        <Grid columns={3} >
        <Grid.Column/>
        <Grid.Column/>
        <Grid.Column>
        <Icon
          size = 'big' 
          name='newspaper'
        />
        </Grid.Column>
        </Grid>
        <Card.Header>{name}</Card.Header>
        <Card.Meta>{authors}</Card.Meta>
        <Feed>
        <Feed.Event>
          <Feed.Content>
            <Feed.Date content='Date of Publication' />
            <Feed.Summary>
             {summary}
            </Feed.Summary>
          </Feed.Content>
        </Feed.Event>
        </Feed>
        <Button.Group widths={5} size='mini'>
         <Button compact  color='teal' content={concept1}/> 
         <Button compact  color='blue' content={concept2}/>
         <Button compact  color='teal' content={concept3}/>  
        </Button.Group>
      </Card.Content>
      <Card.Content extra>
        <div className='ui two buttons'>
          <Button basic color='teal'>
            DOI: {doi}
          </Button>
        </div>
      </Card.Content>
    </Card>
  )
}

export default App;

