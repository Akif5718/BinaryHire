﻿
using BH.Models;
using BH.Models.ResponseModels;
using BH.Models.ViewModels;


namespace BH.Repositories.Interface
{
    public interface IScheduleRepo
    {
        Task<int> SaveSchedule(ScheduleRequestModel model);
        Task<ResultModel<ScheduleResponseModel>> GetScheduleById(int id);
        Task<ResultModel<List<ScheduleResponseModel>>> GetAllSchedule(ScheduleListModel model);
        Task<ResultModel<int>> GetAllScheduleCount(ScheduleListModel model);
        Task<ResultModel<bool>> DeleteScheduleById(int id);
    }
 }



