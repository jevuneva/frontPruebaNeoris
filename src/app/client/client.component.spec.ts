import { HttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';

import { ClientComponent } from './client.component';


describe('ClientComponent', () => {
  let component: ClientComponent;
  let clientServiceMock;

  beforeEach(() => {
    clientServiceMock = {
      getClientAll: jest.fn(),
      inserData: jest.fn(),
      editData: jest.fn()
    };
   
    

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
