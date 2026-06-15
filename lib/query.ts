import { gql } from "@apollo/client";



export function  Add_Quiz(){
    return gql`
   mutation AddQuiz($deScopeId: String!, $marks: String!, $subject: String!, $difficulty: String!, $level: String!, $subBranch: String!)  {
    addQuiz(deScopeId: $deScopeId, marks: $marks, subject: $subject, difficulty: $difficulty, level: $level, subBranch: $subBranch){
        success
    }
   }
  `
}



export function Get_All_Quiz(){
    return gql`
        query GetAllQuiz($userId: String!, $page: String!, $limit: String!){
            getAllQuiz(userId:$userId, page:$page, limit:$limit){
                data {
                    marks,
                    subject,
                    subBranch,
                    createdAt
                  }
                  totalPages
                  totalQuizCount
                  currentPage
                  currentPagePerLimit
            }
        }    
    `
}

export function Get_Custom_Agents(){
    return gql`
        query getCustomAgents($userId: String!){
            getCustomAgents(userId: $userId){
                course{
                    topics{
                        title
                        status
                    }
                    courseComplete
                  },
                _id
                agentName,
                subjectName,
                educationLevel,
                icon,
                difficulty,
                progress
            }
        }    
    `
}




export function Get_Total_Quiz_Count(){
    return gql`
        query getTotalQuizCount($userId: String!){
            getTotalQuizCount(userId: $userId)
        }    
    `
}

export function Get_Total_Agent_Count(){
    return gql`
        query getTotalAgentCount($userId: String!){
            getTotalAgentCount(userId: $userId)
        }    
    `
}


export function Get_Agent_And_Course_By_Id(){
    return gql`
    query getAgentAndCourseById($_id: String!){
        getAgentAndCourseById(_id: $_id){
            _id
            subjectName
            educationLevel
            difficulty
            course{
                topics{
                  title
                  answer
                  status
                  _id
                }
                courseComplete
                _id
              }
        }
    }    
`
}



export function Get_Active_Subscription(){
    return gql`
    query getActiveSubscription($userId: String!){
        getActiveSubscription(userId: $userId){
            planType
            amount
            planStatus
            expire
        }

        getSubscriptions(userId: $userId, limit:10, page:1){
            data{
                planType
                amount
                planStatus
                expire
                createdAt
              }
              page
              limit
              total
              totalPages
        }
    }    
`
} 
export const Get_User = gql`
  query getUser($descopeId: String!) {
    getUser(deScopeId: $descopeId) {
      credits
    }
  }
`;