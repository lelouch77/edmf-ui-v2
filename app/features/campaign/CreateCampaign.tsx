import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import routes from "../../constants/routes.json";
import Header from "../../containers/Header";
import {
  Select,
  TimePicker,
  Slider,
  InputNumber,
  Row,
  Col,
  Input,
  Tabs,
} from "antd";
import moment from "moment";
import { CheckOutlined } from '@ant-design/icons';
import FollowersGrid from '../followers/FollowersGrid'
import CampaignUserGrid from './CampaignUserGrid'

const { Option } = Select;
const { TextArea } = Input;
const { TabPane } = Tabs;

export default function CreateCampaign({ campaign, segments, onSubmit }) {
  const dispatch = useDispatch();
  const [name, setName] = useState(campaign.name);
  const [description, setDescription] = useState(campaign.description);
  const [message, setMessage] = useState(campaign.message);
  const [recipients, setRecipients] = useState(campaign.segmentIds);
  const [scheduledTime, setScheduledTime] = useState(
    getMomentFromTimeStamp(campaign.timestamp ? campaign.timestamp : 0)
  );
  const [messagesPerDay, setMessagesPerDay] = useState(
    campaign.allocated_msg_count
  );
  const [activeTabKey, setActiveTabKey] = useState("1");

  function handleRecipientChange(segmentIds) {
    setRecipients(segmentIds);
  }

  function getMomentFromTimeStamp(timestamp) {
    const hours = Math.floor(timestamp / 60);
    const minutes = timestamp % 60;
    return moment().hours(hours).minutes(minutes);
  }

  function handleSubmit() {
    let scheduledTimeStamp =
      scheduledTime.hours() * 60 + scheduledTime.minutes();
    onSubmit({
      name,
      description,
      message,
      segmentIds: recipients,
      scheduled_time: scheduledTimeStamp,
      allocated_msg_count: messagesPerDay,
    });
  }

  const onTimePickerChange = (selectedTime) => {
    setScheduledTime(selectedTime);
  };

  const messagesPerDayChangeHandler = (messagesPerDay) => {
    setMessagesPerDay(messagesPerDay);
  };

  function onTabChange(activeTabKey){
    setActiveTabKey(activeTabKey);
  }

  return (
    <div className="w-full">
      <Header name="Campaigns" />
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="flex justify-between">
            <p className="text-gray-500">
               {campaign.id?"Edit Campaign":"Create Campaign"} <b>></b> {name}{" "} 
            </p>
            <div className="flex flex-row-reverse">
            {activeTabKey === "1" && (
              <button
                className="bg-indigo-700 hover:bg-indigo-500 text-white font-bold py-2 px-4 rounded"
              >
                Next
              </button>
            )}

              {activeTabKey === "2" && (
                <>
                <button
                className="bg-indigo-700 hover:bg-indigo-500 text-white font-bold py-2 px-4 rounded"
                onClick={handleSubmit}
              >
                Save
              </button>
                <button className="bg-indigo-700 hover:bg-indigo-500 text-white font-bold py-2 px-4 rounded mr-3">
                  Test
                </button>
                </>
              )}
              <Link to={routes.CAMPAIGNS}>
                <button className="bg-gray-100-200 hover:bg-gray-100  font-bold py-2 px-4 rounded mr-3 border">
                    Cancel
                </button>
              </Link>
            </div>
          </div>
          <div className="border-b border-gray-200 mb-4">
            <Tabs
              defaultActiveKey={activeTabKey}
              onChange={onTabChange}
            >
              <TabPane tab="Configuration" key="1">
                <div>
                  <form className="w-full max-w-lg">
                    <div className="flex flex-wrap -mx-3 mb-6">
                      <div className="w-full px-3 mb-6 md:mb-0">
                        <label
                          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                          htmlFor="name"
                        >
                          Name
                        </label>
                        <input
                          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                          type="text"
                          placeholder="Eg. New book Promotion"
                          value={name}
                          onChange={(e: any) => setName(e.target.value)}
                        />
                      </div>
                      <div className="w-full px-3">
                        <label
                          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                          htmlFor="description"
                        >
                          Description
                        </label>
                        <input
                          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                          type="text"
                          placeholder="Campaign Description"
                          value={description}
                          onChange={(e: any) => setDescription(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                      <div className="w-full px-3">
                        <label
                          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                          htmlFor="message"
                        >
                          Message
                        </label>
                        <TextArea
                          rows={6}
                          defaultValue={message}
                          onChange={(e: any) => setMessage(e.target.value)}
                        />
                        {message.length < 10000 && (
                          <span className="text-gray-600 text-xs pt-2">
                            Remaining {10000 - message.length} characters
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-3">
                      <div className="w-full px-3">
                        <label
                          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                          htmlFor="recipients"
                        >
                          Recipients
                        </label>
                        <Select
                          mode="multiple"
                          style={{ width: "100%" }}
                          placeholder="Select a segment"
                          onChange={handleRecipientChange}
                          optionLabelProp="label"
                        >
                          {segments.map((segment) => (
                            <Option
                              key={segment.id}
                              value={segment.id}
                              label={segment.name}
                            >
                              <div className="demo-option-label-item">
                                {segment.name}
                              </div>
                            </Option>
                          ))}
                        </Select>
                      </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-2 mt-8">
                      <div className="w-full px-3">
                        <label
                          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                          htmlFor="recipients"
                        >
                          Schedule At
                        </label>
                        <TimePicker
                          use12Hours
                          format="h:mm A"
                          onChange={onTimePickerChange}
                          style={{ width: 140 }}
                          defaultValue={scheduledTime}
                        />
                      </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-2 mt-8">
                      <div className="w-full px-3">
                        <label
                          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                          htmlFor="recipients"
                        >
                          Messages Per Day
                        </label>
                        <label
                          className="block tracking-wide text-gray-600 text-xs font-base mb-2"
                          htmlFor="recipients"
                        >
                          You can send up to 1,000 messages per day
                        </label>
                        <Row>
                          <Col span={12}>
                            <Slider
                              min={0}
                              max={1000}
                              step={10}
                              onChange={messagesPerDayChangeHandler}
                              value={
                                typeof messagesPerDay === "number"
                                  ? messagesPerDay
                                  : 0
                              }
                            />
                          </Col>
                          <Col span={4}>
                            <InputNumber
                              min={0}
                              max={1000}
                              style={{ margin: "0 16px" }}
                              value={messagesPerDay}
                              onChange={messagesPerDayChangeHandler}
                            />
                          </Col>
                        </Row>
                      </div>
                    </div>
                  </form>
                </div>
              </TabPane>
              <TabPane tab="Review" disabled={false} key="2">
                <div className="ag-theme-alpine" style={{ height: 'calc(100vh - 100px)', width: '100%' }}>
                   {activeTabKey ==="2" && (<FollowersGrid segmentIds={recipients}/>)}
                </div>
              </TabPane>
              <TabPane tab="Status" key="3">
                 <div className="ag-theme-alpine" style={{ height: 'calc(100vh - 100px)', width: '100%' }}>
                 {activeTabKey ==="3" && campaign.id && (<CampaignUserGrid campaignId={campaign.id}/>)}
                </div>
              </TabPane>
            </Tabs>
          </div>
          <div></div>
        </div>
      </main>
    </div>
  );
}
