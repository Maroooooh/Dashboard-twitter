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
    trigger('counterAnimation', [
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
  cnt: number = 0;
  cntpost :number = 0 ; 

  constructor(
    public usersapiservice: UsersService,
    public postsapiservice: PostsService
  ) {}

  ngAfterViewInit(): void {
    this.startCounterAnimation();
  }
  ngOnInit(): void {
    this.usersapiservice.getAllUsers().subscribe({
      next: (data) => {
        console.log(data);
        this.Users = data;
        const dateCounts: { [date: string]: number } = {};
        const userStatus: { [status: string]: number } = {};

        data.forEach((user) => {
          const date = new Date(user.createdAt).toLocaleDateString();
          dateCounts[date] = (dateCounts[date] || 0) + 1;
          userStatus[user.status] = (userStatus[user.status] || 0) + 1;
        });

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
                { value: userStatus['Active'], name: 'Active' },
                { value: userStatus['Inactive'], name: 'Inactive' },
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
    }, 200);
    this.postsapiservice.getAllPosts().subscribe({
      next: (data) => {
        console.log(data);
        this.Posts = data;
        const postsusers: { [name: string]: number } = {};

        data.forEach((posts) => {
          postsusers[posts.userId.name] =
            (postsusers[posts.userId.name] || 0) + 1;
        });
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
              barWidth: 40,
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
    }, 200);
  }
  counterAnimationState = 'start';

  startCounterAnimation(): void {
    this.counterAnimationState = 'end';
  }
}
