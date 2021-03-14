import './App.css';
import React, { useState, useEffect } from 'react'
import 'semantic-ui-css/semantic.min.css'
import { Container, Divider, Menu, Checkbox, Grid, Header, Icon, Feed, Button, Card} from 'semantic-ui-react'
import * as R from 'ramda'

const App = () => {
  const[filter, setFilter] = useState('ALL')
  const getAllPublications = async () => {
    const url = `http://localhost:5000/graphql?query=query{publications{abstract title authors doi concepts}}`;
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

  const getFilter = async(filterWord) => {
    if (filterWord === 'ALL') {
      getAllPublications();
    } else {
      let concepts = [];
      switch(filterWord) {
        case 'female':
          concepts = '["female"]'
          break;

        case 'male':
          concepts = '["male"]'
          break;

        case 'child':
          concepts = '["child", "child, preschool", "infant", "infant, newborn"]'
          break;

        case 'young adult':
          concepts = '["young adult", "adolescent"]'
          break;

        case 'adult':
          concepts = '["middle aged", "adult"]'
          break;

        case 'geriatric':
          concepts = '["aged", "80 and over"]'
          break;

        case 'comorbidity':
          concepts = '["comorbidity"]'
          break;

        case 'risk factors':
          concepts = '["risk factors"]'
          break;

        case 'antibodies':
          concepts = '["antiviral agents", "antibodies", "viral"]'
          break;

        case 'viral vaccines':
          concepts = '["viral vaccines"]'
          break;
      }
      const url = `http://localhost:5000/graphql?query=query{publicationByConcept(concepts: ${concepts}){abstract title authors doi concepts}}`;
      const res = await fetch(url)
      const publicationsInfo = await res.json()
      console.log(publicationsInfo.data.publicationByConcept);
      setPublications(publicationsInfo.data.publicationByConcept)
    }
    setFilter(filterWord);
  }

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
      <br/> 
    <Grid columns ={4}>
      <Grid.Column>
    <Header as='h4' textAlign='left'>
        Research Filter:
    </Header>
    <Menu pointing secondary vertical color='teal'>
        <Menu.Item
          name='All'
          active={filter === 'ALL'}
          onClick= {()=> getFilter('ALL')}
        />
        <Menu.Item
          name='Female'
          active={filter === 'female'}
          onClick= {()=> getFilter('female')}
        />
        <Menu.Item
          name='Male'
          active={filter === 'male'}
          onClick= {()=> getFilter('male')}
        />
        <Menu.Item
          name='Child'
          active={filter === 'child'}
          onClick= {()=> getFilter('child')}
        />
        <Menu.Item
          name='Young Adult'
          active={filter === 'young adult'}
          onClick= {()=> getFilter('young adult')}
        />
        <Menu.Item
          name='Adult'
          active={filter === 'adult'}
          onClick= {()=> getFilter('adult')}
        />
        <Menu.Item
          name='Geriatric'
          active={filter === 'geriatric'}
          onClick= {()=> getFilter('geriatric')}
        />
        <Menu.Item
          name='Comorbidity'
          active={filter === 'comorbidity'}
          onClick= {()=> getFilter('comorbidity')}
        />
        <Menu.Item
          name='Risk Factors'
          active={filter === 'risk factors'}
          onClick= {()=> getFilter('risk factors')}
        />
        <Menu.Item
          name='Antibodies'
          active={filter === 'antibodies'}
          onClick= {()=> getFilter('antibodies')}
        />
        <Menu.Item
          name='Viral Vaccines'
          active={filter === 'viral vaccines'}
          onClick= {()=> getFilter('viral vaccines')}
        />
      </Menu>
    </Grid.Column>
    <Grid.Column width={10}>
        <Card.Group centered itemsPerRow={3}>
      {
        R.map(
          ({abstract, title, authors, doi, concepts}) => (
              <PublicationCard 
                  name = {title}
                  summary = {abstract}
                  authors = {authors}
                  doi = {doi}
                  concept1 = {concepts.length > 0 ? concepts[0] : ''}
                  concept2 = {concepts.length > 1 ? concepts[1] : ''}
                  concept3 = {concepts.length > 0 ? concepts[2] : ''}
              />
        ), publications
        )}
        </Card.Group>
        </Grid.Column>
    </Grid> 
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

