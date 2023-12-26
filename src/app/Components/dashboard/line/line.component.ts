import { Component, OnInit } from '@angular/core';
import { ECharts } from 'echarts/core';
import { EChartsOption } from 'echarts';
import { IUsers } from 'src/app/Models/iusers';
import { UsersService } from 'src/app/Services/users.service';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
import { PostsService } from 'src/app/Services/posts.service';
import { IPosts } from 'src/app/Models/iposts';
@Component({
  selector: 'app-line',
  templateUrl: './line.component.html',
  styleUrls: ['./line.component.scss'],
  animations: [
    trigger('userCounterAnimation', [
      state(
        'start',
        style({
          opacity: 0,
          transform: 'translateY(-50px)',
        })
      ),
      state(
        'end',
        style({
          opacity: 1,
          transform: 'translateY(0)',
        })
      ),
      transition('start => end', animate('1s')),
    ]),
    trigger('postCounterAnimation', [
      state(
        'start',
        style({
          opacity: 0,
          transform: 'translateY(-50px)',
        })
      ),
      state(
        'end',
        style({
          opacity: 1,
          transform: 'translateY(0)',
        })
      ),
      transition('start => end', animate('1s')),
    ]), trigger('likesCounterAnimation', [
      state(
        'start',
        style({
          opacity: 0,
          transform: 'translateY(-50px)',
        })
      ),
      state(
        'end',
        style({
          opacity: 1,
          transform: 'translateY(0)',
        })
      ),
      transition('start => end', animate('1s')),
    ]), trigger('repostsCounterAnimation', [
      state(
        'start',
        style({
          opacity: 0,
          transform: 'translateY(-50px)',
        })
      ),
      state(
        'end',
        style({
          opacity: 1,
          transform: 'translateY(0)',
        })
      ),
      transition('start => end', animate('1s')),
    ]),
  ],
  
})
export class LineComponent implements OnInit {
  Users: IUsers[] = [];
  echartsInstance: ECharts | undefined;
  Posts: IPosts[] = [];
  option: EChartsOption = {};
  option1: EChartsOption = {};
  option2: EChartsOption = {};
  option3: EChartsOption = {} ;
  option4:EChartsOption ={};
  option5:EChartsOption={};
  cnt: number = 0;
  cntpost :number = 0 ; 
  cntlikes :number = 0 ;
  cntlike :number = 0 ;
  cntreposts:number = 0;
  cntrepost:number = 0 ;

  constructor(
    public usersapiservice: UsersService,
    public postsapiservice: PostsService
  ) {}

  ngAfterViewInit(): void {
    this.startCounterAnimation();
     localStorage.setItem('userCount', this.cnt.toString());
    localStorage.setItem('postCount', this.cntpost.toString());
  }
  ngOnInit(): void {
   
    this.usersapiservice.getAllUsers().subscribe({
      next: (data) => {
        console.log(data);
        this.Users = data;
        const dateCounts: { [date: string]: number } = {};
        const userStatus: { [status: string]: number } = {};
        const userGender: { [type : string] : number} = {};
        const userfollow: { [name: string]: { followers: number; following: number } } = {};
        data.forEach((user) => {
          const date = new Date(user.createdAt).toLocaleDateString();
          dateCounts[date] = (dateCounts[date] || 0) + 1;
          userStatus[user.status] = (userStatus[user.status] || 0) + 1;
          userGender[user.gender] = (userGender[user.gender] || 0) +1 ; 
          // console.log(user.name,user.followers.length) ;
          // console.log(user.name,user.following.length) ;
          const followersCount = user.followers?.length || 0;  // Assuming followers is an array of user IDs
          const followingCount = user.following?.length|| 0; 
          // console.log(user.name,followersCount ) ;
          // console.log(user.name,followingCount) ;
          userfollow[user.name] = {
            followers: (userfollow[user.name]?.followers || 0) + followersCount,
            following: (userfollow[user.name]?.following || 0) + followingCount,
          }
        });
        userStatus['Active'] = ((userStatus['Active']/this.Users.length)*100 )
        userStatus['Inactive'] = ((userStatus['Inactive']/this.Users.length)*100 )
        // console.log("xxxxxxxxxx")
        // console.log("males",userGender['male'])

        userGender['male'] = ((userGender['male']/this.Users.length) *100)
        userGender['female'] = ((userGender['female']/this.Users.length) *100)

        this.option4 = {
          title: {
            text: 'Users Followers'
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          legend: {},
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: {
            type: 'value',
            boundaryGap: [0, 0.01]
          },
          yAxis: {
            type: 'category',
            data: Object.keys(userfollow)
          },
          series: [
            {
              name: 'Followers',
              type: 'bar',
             data: Object.keys(userfollow).map((key) => userfollow[key].followers),
             itemStyle:{
              color:'#3498db'
             }

            },
            {
              name: 'Following',
              type: 'bar',
              data: Object.keys(userfollow).map((key) => userfollow[key].following),
              itemStyle: {
                color: '#2ecc71', // Adjust the color as needed
              },
            }
          ]
        };
        
        this.option = {
          title: {
            text: 'User Registration ',
            left: 'center',
            textStyle: {
              color: '#333',
              fontSize: 16,
              fontWeight: 'bold',
            },
          },
          xAxis: {
            type: 'category',
            data: Object.keys(dateCounts),
            axisLabel: {
              rotate: 45,
              color: 'black',
            },
          },
          yAxis: {
            type: 'value',
            axisLabel: {
              color: 'black',
            },
          },
          series: [
            {
              type: 'line',
              lineStyle: {
                color: 'red',
              },
              data: Object.values(dateCounts),
            },
          ],
        };
        this.option1 = {
          tooltip: {
            trigger: 'item',
          },
          legend: {
            top: '5%',
            left: 'center',
          },
          series: [
            {
              name: 'Status',
              type: 'pie',
              radius: ['40%', '70%'],
              avoidLabelOverlap: false,
              label: {
                show: false,
                position: 'center',
              },
              emphasis: {
                label: {
                  show: true,
                  fontSize: 40,
                  fontWeight: 'bold',
                },
              },
              labelLine: {
                show: false,
              },
              data: [
                { value: userStatus['Active'], name: 'Active' , itemStyle: { color: '#D8872B' } },
                { value: userStatus['Inactive'], name: 'Inactive', itemStyle: { color: '#922AA2' } },
              ],
            },
          ],
        };
        this.option3 = {
          tooltip: {
            trigger: 'item',
          },
          legend: {
            top: '5%',
            left: 'center',
          },
          series: [
            {
              name: 'Status',
              type: 'pie',
              radius: ['0%', '60%'],
              avoidLabelOverlap: false,
              label: {
                show: false,
                position: 'center',
              },
              emphasis: {
                label: {
                  show: true,
                  fontSize: 40,
                  fontWeight: 'bold',
                },
              },
              labelLine: {
                show: false,
              },
              data: [
                { value: userGender['male'], name: 'Male' , itemStyle: { color: '#3668DC' } },
                { value: userGender['female'], name: 'Female', itemStyle: { color: '#DC36AA' } },
              ],
            },
          ],
        };
      },
      error: (err) => {
        console.log(err);
      },
    });
    let i = 0;
    const intervalId = setInterval(() => {
      if (i <= this.Users.length) {
        this.cnt = i++;
      } else {
        clearInterval(intervalId);
      }
    }, 700);
    this.postsapiservice.getAllPosts().subscribe({
      next: (data) => {
        console.log(data);
        this.Posts = data;
        const postsusers: { [name: string]: number } = {};
        console.log(this.Posts.length)
        data.forEach((posts) => {
          postsusers[posts.userId.name] =(postsusers[posts.userId.name] || 0) + 1;
           this.cntlikes += posts.likes?.length||0 ;
           this.cntreposts+=posts.reposts?.length||0 ;  
           

        });
        const sortedPosts = Object.entries(postsusers)
  .sort((a, b) => b[1] - a[1]) // Sort in descending order based on likeCount
  .slice(0, 3); // Take the top 3 posts

const xAxisData = sortedPosts.map(([userName, _]) => {
  const matchingPost = this.Posts.find(post => post.userId.name === userName);
  return matchingPost ? matchingPost.title : ''; // Adjust as needed
});

const seriesData = sortedPosts.map(([_, likeCount]) => likeCount);
      
      this.option5 = {
        xAxis: {
          max: 'dataMax',
        },
        yAxis: {
          type: 'category',
          data: xAxisData,
          inverse: true,
          max: 2, 
          axisLabel: {
            interval: 0, // Display all labels
            rotate: 45, // Rotate labels if needed
          },
        },
        series: [
          {
            name: 'top tweets take likes',
            type: 'bar',
            data: seriesData,
            label: {
              show: true,
              position: 'right',
            },
            itemStyle:{
              color:"#E65757"
            }
          },
        ],
        legend: {
          show: true,
        },
      };
      

        this.option2 = {
          title: {
            text: 'Posts ',
            left: 'center',
            textStyle: {
              color: '#333',
              fontSize: 16,
              fontWeight: 'bold',
            },
          },
          xAxis: {
            type: 'category',
            data: Object.keys(postsusers),
            axisLabel: {
              rotate: 45,
              color: 'black',
            },
          },
          yAxis: {
            type: 'value',
            axisLabel: {
              color: 'black',
            },
          },
          series: [
            {
              data: Object.values(postsusers),
              type: 'bar',
              barWidth: 10,
              itemStyle:{color:'#04A519'
            },
            },
          ],
        };
      },
      error: (err) => {
        console.log(err);
      },
    });
    let i2 = 0;
    const intervalId2 = setInterval(() => {
      if (i2 <= this.Posts.length) {
        this.cntpost = i2++;
      } else {
        clearInterval(intervalId2);
      }
    }, 700);
    let i3 = 0;
    const intervalId3 = setInterval(() => {
      if (i3 <= this.cntlikes) {
        this.cntlike= i3++;
      } else {
        clearInterval(intervalId3);
      }
    }, 700);
    let i4 = 0;
    const intervalId4 = setInterval(() => {
      if (i4 <= this.cntreposts) {
        this.cntrepost= i4++;
      } else {
        clearInterval(intervalId4);
      }
    }, 700);
  } 
  
  counterAnimationState = 'start';
  startCounterAnimation(): void {
    this.counterAnimationState = 'end';
  }
}
