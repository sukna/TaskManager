using AutoMapper;
using TaskManager.User.Models;

public class MappingProfile : Profile {
     public MappingProfile() {
         
         CreateMap<User, AppUser>();
         CreateMap<AppUser, User>();

         CreateMap<User, UserRegister>();
         CreateMap<UserRegister, User>();

         CreateMap<UserLogin, AppUser>();
         CreateMap<AppUser, UserLogin>();

         CreateMap<UserLogin, User>();
         CreateMap<User, UserLogin>();

         CreateMap<UserRegister, AppUser>();
         CreateMap<AppUser, UserRegister>();
     }
 }