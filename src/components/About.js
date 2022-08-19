
import '../App.css';
import { Container} from 'react-bootstrap'

function About() {
  function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * 
    charactersLength));
    }
    return result;
}
  let resume = {
    // WORK
    work: [
      {
        title: 'Test Engineer Co-op',
        company: 'Nokia',
        duration: 'May - August 2022',
        description: ['Modernized core testing suites for service routing hardware by migrating from TCL to Python.',
                      'Reduced runtime of existing Python test suites by up to 50% by optimizing framework.']
      },
      {
        title: 'Teaching Assistant',
        company: 'Carleton University',
        duration: 'June 2021 - April 2022',
        description: ['COMP2402 - Abstract Data Types and Algorithms: Ran weekly tutorials and workshops designed to help students understand different data structures, their respective advantages and drawbacks, and related algorithms.',
                      'COMP1406/1006 - Introduction to Computer Science II: Ran weekly 3-hour tutorials for undergraduate students, hosted weekly office hours, and graded assignments submitted in Java.']
      },
      {
        title: 'Student Research Internship',
        company: 'Carleton University',
        duration: 'December 2021 - January 2022',
        description: ["Designed, tested, and implemented novel problems in Java for Carleton’s second year Abstract Data Types and Algorithms course.",
                    "Included implementation of an automated testing server which accepted and graded student submissions based on time and/or space complexities."]
      },
      {
        title: 'Student Research Internship',
        company: 'Carleton University',
        duration: 'September 2020 - January 2021',
        description: ['Designed and implemented a program in Python to generate randomized functional DNA sequences along with associated unique multiple choice questions and answers for a second year genetics course.']
      },
      {
        title: 'NSERC USRA Student Researcher',
        company: 'Carleton University',
        duration: 'May - August 2018',
        description: ['Deployed computational techniques (eg. sequence alignments) to identify novel protein-protein interactions in the human proteome.',
                    'Implemented biochemical and molecular biology lab techniques such as PCR, affinity chromatography, and Western blots to validate predicted protein-protein interactions.']
      },
      {
        title: 'Bartender',
        company: 'Blue Cactus Bar and Grill',
        duration: 'October 2011 - January 2022',
        description: ['Provided high standard of service in fast-paced and high-stress environment.', 'Developed customer loyalty through friendly interactions', 'Managed inventory and cash/credit transactions.']
      },
    ],
    // EDUCATION
    education: [
      {
        title: 'Bachelor of Computer Science',
        company: 'Carleton University',
        description: ['GPA 11.7/12'],
        duration: 'Anticipated graduation - May 2023'
      }
    ],
    // AWARDS
    awards: [
      {
        title: 'NSERC USRA',
        description: ['Competitive GPA and merit-based award for paid summer research.'],
        duration: 'May - August 2018'
      },
      {
        title: "Dean's List",
        description: ['Financial award for high academic success.'],
        duration: '2016 - 17, 2017 - 18, 2021 - 2022'

      }
    ],
    // Publications
    publications: [
      {
        authors: "K. K. Biggar, F. Charih, H. Liu, Y. B. Ruiz-Blanco, L. Stalker, A. Chopra, J. Connolly, H. Adhikary, K. Frensemier, M. Hoekstra, M. Galka, Q. Fang, C. Wynder, W. L. Stanford, J. R. Green, and S. S. Li,",
        title: "Proteome-wide Prediction of Lysine Methylation Leads to Identification of H2BK43 Methylation and Outlines the Potential Methyllysine Proteome,",
        journal: "Cell Reports,",
        journal_info: "vol. 32, no. 2, p. 107896, 2020"

      },
      {
        authors: 'Z. Wu, J. Connolly, and K. K. Biggar,',
        title: "Beyond histones – the expanding roles of protein lysine methylation,",
        journal: "FEBS Journal,",
        journal_info: "vol. 284, no. 17, pp. 2732–2744, 2017"
      }
    ]
  }
  return (
    <div className="App">
      <Container>
        <br/>
        {/* These are some interesting things about me. */}
        <section>
          <table id="work-experience" className="resume-table">
            <tbody>
            {/* <tr><h5>Education</h5></tr> */}
            <tr><td className="profile-experience-entry"><h5>Education</h5></td></tr>
              {resume.education.map(section => {
                return (
                <tr key={"profile-experience-" + makeid(5)} className="profile-experience-entry">
                  <td key={"profile-duration-" + makeid(5)} className="profile-experience-duration"><span className="profile-experience-duration">{section.duration}</span></td>
                  <td key={"profile-experience-content-" + makeid(5)} className="profile-experience-content">
                    <div><strong>{section.title} at {section.company}</strong></div>
                    <div key={"profile-experience-description-" + makeid(5)}>
                    {section.description.map(entry => {
                      return (
                        <p key={"experience-descriptiopn-" + makeid(5)}>{entry}</p>
                      )
                    })}
                    </div>
                  </td>
                  </tr>
                  )
                })}
                <tr><td className="profile-experience-entry"><h5>Employment</h5></td></tr>
                {resume.work.map(section => {
                  return (
                  <tr key={"profile-experience-" + makeid(5)} className="profile-experience-entry">
                    <td key={"profile-duration-" + makeid(5)} className="profile-experience-duration"><span className="profile-experience-duration">{section.duration}</span></td>
                    <td key={"profile-experience-content-" + makeid(5)} className="profile-experience-content">
                      <div><strong>{section.title} at {section.company}</strong></div>
                      <div key={"profile-experience-description-" + makeid(5)}>
                      {section.description.map(entry => {
                        return (
                          <p key={"experience-description-" + makeid(5)}>{entry}</p>
                        )
                      })}
                      </div>
                    </td>
                    </tr>
                    )
                })}
                <tr><td className="profile-experience-entry"><h5>Awards</h5></td></tr>
                {resume.awards.map(section => {
                  return (
                  <tr key={"profile-experience-" + makeid(5)} className="profile-experience-entry">
                    <td key={"profile-duration-" + makeid(5)} className="profile-experience-duration"><span className="profile-experience-duration">{section.duration}</span></td>
                    <td key={"profile-experience-content-" + makeid(5)} className="profile-experience-content">
                      <div><strong>{section.title}</strong></div>
                      <div key={"profile-experience-description-" + makeid(5)}>
                      {section.description.map(entry => {
                        return (
                          <p key={"experience-description-" + makeid(5)}>{entry}</p>
                        )
                      })}
                      </div>
                    </td>
                    </tr>
                    )
                })}
                <tr><td className="profile-experience-entry"><h5>Publications</h5></td></tr>
                {resume.publications.map(section => {
                  return (
                  <tr key={"profile-experience-" + makeid(5)} className="profile-experience-entry">
                    <td key={"profile-experience-content-" + makeid(5)} className="profile-experience-content" colSpan={2}>
                      <div key={"profile-experience-description-" + makeid(5)}>
                      {section.authors} {'"' + section.title + '"'} <em>{section.journal}</em> {section.journal_info}
                      </div>
                    </td>
                    </tr>
                    )
                })}
        </tbody>
        </table>
        {/*<ResumeSection props={resume.work}/>*/}
        </section>
      </Container>
    </div>
  );
}

export default About;