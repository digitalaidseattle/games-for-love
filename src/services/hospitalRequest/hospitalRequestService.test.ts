import { describe, expect, it, vi } from 'vitest';
import { airtableService } from '../../mapping/airtableService';
import { hospitalRequestService } from './hospitalRequestService';

describe('HospitalRequestService tests', () => {
  it('getHospitalRequest', async () => {
    const mockRecords = [
      {
        fields: {
          "Opportunities/Requests ID": "REQ12345",
          "Hospital Name (LInked)": "May's Hospital",
          "Request Narrative": "Request for new equipment",
          "# Equipment Requested (TBD if we show single brands + extras)": 10,
          "$ Requested": 5000,
          "Kids 3Y": 300,
          "Play 3Y": 200,
          "$ Collected": 4000,
          "# Funders": 5,
          "Request Picture 1": "pic1.jpg",
          "Request Picture 2": "pic2.jpg",
          "Request Picture 3": "pic3.jpg",
          "Request Picture 4": "pic4.jpg",
          "Request Picture 5": "pic5.jpg",
          "Corp Partner 1 Name": "Partner 1",
          "Corp Partner 1 Logo": "logo1.png",
          "Corp Partner 1 Type": "Type 1",
          "Corp Partner 2 Name": "Partner 2",
          "Corp Partner 2 Logo": "logo2.png",
          "Corp Partner 2 Type": "Type 2",
        },
      },
    ];

    const getTableRecordsSpy = vi.spyOn(airtableService, 'getTableRecords').mockResolvedValue(mockRecords as any);

    const result = await hospitalRequestService.getHospitalRequest();

    expect(getTableRecordsSpy).toHaveBeenCalled();

    expect(result).toEqual([
      {
        oppReqId: 'REQ12345',
        name: 'May\'s Hospital',
        requestNarrative: 'Request for new equipment',
        equipReq: 10,
        requested: 5000,
        kids3Y: 300,
        play3Y: 200,
        collected: 4000,
        funders: 5,
        requestPicture1: 'pic1.jpg',
        requestPicture2: 'pic2.jpg',
        requestPicture3: 'pic3.jpg',
        requestPicture4: 'pic4.jpg',
        requestPicture5: 'pic5.jpg',
        corpPartner1Name: 'Partner 1',
        corpPartner1Logo: 'logo1.png',
        corpPartner1Type: 'Type 1',
        corpPartner2Name: 'Partner 2',
        corpPartner2Logo: 'logo2.png',
        corpPartner2Type: 'Type 2',
      },
    ]);
  });
});
